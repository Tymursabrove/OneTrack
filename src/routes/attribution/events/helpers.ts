import { currencyCustomSymbolFormatter } from '$lib/helpers/MiscHelpers';
import { GetColumnDefinition } from '$lib/helpers/TableHelpers';
import type { EventData, eventDataAttributionEventData } from '$lib/types/HttpResponsesTypes';
import type { CustomEventDataType, CustomEventTilesDataType } from '$lib/types/Types';
import moment from 'moment';

/**
 * This is a JavaScript utility module containing several functions aimed at analyzing and processing
 * ad event data. The objective of this module is to extract, analyze, process and organize attribution
 * data from various sources into a clean, standardized format for further analysis or reporting.
 *
 * The exported functions include:
 *
 * 1. `processData`: This function accepts an array of event Objects as input, processes raw event
 *    data and creates summarized card data. Each event object should roughly follow the structure:
 *        {
 *            "target": {...},
 *            "profile": {...},
 *            "attributions": [...]
 *        }
 *
 * 2. `tableSummary`: This function creates a summary row for presentation purposes based on processed
 *    data. It accepts an array of processed data to base the summary on.
 *
 * Most of the functions in this module are helper/utility functions used by the main processData function.
 * Here is a brief overview of their roles:
 *
 * - `isAdSource`: Checks if the provided data object contains ad-related keys, returning true if found
 *    and false otherwise.
 *
 * - `findClickIdKey`: Searches the 'clickIds' array in the given data object and returns the first key
 *    found. If no key is found, it returns an empty string.
 *
 * - `getCardName`: Returns the mapped source name according to the source mapping, or the original source
 *    name if no mapping was found.
 *
 * - `extractAttributionData`: Extracts necessary attribution data from the given data object and organizes
 *    it into a standard structure.
 *
 * Additionally, constant mappings such as `sourceMapping`, `clickIdMapping`, and `clickIds` are defined
 * which are used across multiple functions for consistent keyword mapping and checking.
 *
 * This module assumes that the input data is well-formed and doesn't do much error-checking.
 */

/**
 * Detects if the given data object contains ad information.
 *
 * @param {Object} data - The data object to analyze.
 * @returns {boolean} True if ad-related keys are found in the object, false otherwise.
 */
export const isAdSource = (data: eventDataAttributionEventData) =>
	data?.adId || data?.adSetId || data?.campaignId;

// Defined sources mapping constant
const sourceMapping = {
	meta: ['fb', 'facebook', 'meta', 'ig', 'instagram', 'insta', 'fbads', 'igshopping'],
	tiktok: ['tiktok', 'tt', 'tiktokads'],
	google: ['google', 'ytb', 'youtube', 'adwords', 'googleads'],
	snapchat: ['snapchat', 'snap', 'snapads'],
	taboola: ['taboola'],
	klaviyo: ['klaviyo'],
	pinterest: ['pinterest', 'pinads'],
	awin: ['awin'],
	twitter: ['twitter', 'tweet', 'twitterads'],
	linkedin: ['linkedin', 'linkedads'],
	outbrain: ['outbrain'],
	xing: ['xing'],
	yahoo: ['yahoo', 'yahooads'],
	ecosia: ['ecosia'],
	affiliate: ['affiliate', 'aff'],
	reddit: ['reddit'],
	quora: ['quora'],
	bing: ['bing', 'bingads'],
	spotify: ['spotify'],
	criteo: ['criteo'],
	yandex: ['yandex'],
	amazon: ['amazon'],
	dailymotion: ['dailymotion'],
	vimeo: ['vimeo'],
	twitch: ['twitch']
};

// Defined clickId mapping constant
export const clickIdMapping = {
	fbclid: 'meta',
	ttclid: 'tiktok',
	gclid: 'google',
	gbraid: 'google',
	wbraid: 'google',
	msclkid: 'bing',
	snapclid: 'snapchat',
	twclid: 'twitter',
	pclid: 'pinterest',
	tabclid: 'taboola',
	klaviyoclick: 'klaviyo',
	referred: 'affiliate',
	affid: 'affiliate'
};

// Defined clickIds array constant
const clickIds = [
	'fbclid',
	'ttclid',
	'gclid',
	'gbraid',
	'wbraid',
	'msclkid',
	'snapclid',
	'twclid',
	'pclid',
	'tabclid',
	'klaviyoclick',
	'referred',
	'affid'
];

/**
 * Finds the first key from 'clickIds' array in the given data object.
 *
 * @param {Object} data - The data object to search.
 * @returns {string} The first found key or an empty string if no key was found.
 */
const findClickIdKey = (data: eventDataAttributionEventData) => {
	return clickIds.find((key) => data?.hasOwnProperty(key)) || '';
};

// Creating a flat source mapping variable for efficiency
const flatSourceMapping = Object.keys(sourceMapping).reduce((acc: { [key: string]: any }, key) => {
	let parsedKey = key as keyof typeof sourceMapping;
	sourceMapping[parsedKey].forEach((source) => {
		acc[source] = key;
	});
	return acc;
}, {});

/**
 * Gets the card name according to the source mapping.
 *
 * @param {string} sourceName - The source name to map.
 * @returns {string} The mapped source name or the original source name if no mapping was found.
 */
const getCardName = (sourceName: string) => {
	return flatSourceMapping[sourceName] || sourceName;
};

/**
 * Extracts relevant attribution data from the given data object.
 *
 * @param {Object} attributionData - The data object to extract from.
 * @returns {Object} An object containing all the extracted data.
 */
const extractAttributionData = (attributionData: eventDataAttributionEventData) => {
	const isAd = isAdSource(attributionData);
	const foundClickId = findClickIdKey(attributionData);

	return {
		isAd,
		source: isAd ? 'Ad-Source' : attributionData?.referrerGroup || attributionData?.utmSource || '',
		campaignId: attributionData?.campaignId || '',
		adSetId: attributionData?.adSetId || '',
		adId: attributionData?.adId || '',
		category: isAd ? 'ad' : 'organic',
		utmSource: attributionData?.utmSource || '',
		utmMedium: attributionData?.utmMedium || '',
		utmCampaign: attributionData?.utmCampaign || '',
		clickIdExists: foundClickId ? '✅' : '❌',
		clickId: foundClickId
	};
};

/**
 * Processes raw event data and creates summarized card data.
 *
 * @param {Array} events - The array of event objects to process.
 * @returns {Object} An object containing processed event data and card summaries.
 */
export const processData = (events) => {
	const cardData = {};

	/**
	 * processEvent function:
	 *
	 * Overview:
	 * This function accepts an event object as a parameter and extracts, processes, and organizes data into a required format.
	 * The function transforms each event's target, profile, and attributions data into relevant categories and card data.
	 * It returns a new object with processed information, ready for further use.
	 *
	 * @param {object} event - The event object containing target, profile, and attributions details to be processed.
	 *
	 * @returns {Object} Returns a new object contains a timestamp, url, value, currency, orderId, email, phone, onetrackId,
	 *                   cardCategory and attributionInfo.
	 */

	const processEvent = ({ target, profile, attributions }) => {
		const attributionInfo =
			attributions && attributions.length > 0
				? extractAttributionData(attributions[0].event.data)
				: { category: 'direct' };

		const category = (attributionInfo.category || 'direct').toLowerCase().trim();

		/**
		 * getSourceName function:
		 *
		 * Overview:
		 * This is a helper function within processEvent.
		 * It uses the category of the event (ad, organic, or direct) to determine and return the corresponding source name.
		 * If the source name is not specifically ad or organic, it will return 'direct'.
		 *
		 * @returns {string} Returns the source name based on its event category.
		 */
		const getSourceName = () => {
			if (category === 'ad') {
				if (attributionInfo.utmSource) return attributionInfo.utmSource.toLowerCase().trim();
				else if (attributionInfo.clickId)
					return clickIdMapping[attributionInfo.clickId.toLowerCase().trim()] || '';
			} else if (category === 'organic' && attributionInfo.source) {
				return attributionInfo.source.toLowerCase().trim();
			}
			return 'direct';
		};

		const sourceName = getSourceName();

		const cardCategory = getCardName(
			sourceName.includes(',') ? sourceName.split(',')[0].trim() : sourceName.trim()
		);

		const card = cardData[cardCategory] || {
			adValue: 0,
			organicValue: 0,
			directValue: 0,
			totalValue: 0,
			adEvents: 0,
			organicEvents: 0,
			directEvents: 0,
			totalEvents: 0
		};

		let value =
			typeof target?.data?.value === 'number' ? parseFloat(target.data.value.toFixed(2)) : 0;

		card.totalValue += value;
		card.totalEvents++;
		card.totalValue = Number(card.totalValue.toFixed(2));

		if (category === 'ad') {
			card.adValue += value;
			card.adEvents++;
			card.adValue = Number(card.adValue.toFixed(2));
		} else if (category === 'organic') {
			card.organicValue += value;
			card.organicEvents++;
			card.organicValue = Number(card.organicValue.toFixed(2));
		} else {
			card.directValue += value;
			card.directEvents++;
			card.directValue = Number(card.directValue.toFixed(2));
		}

		if (!cardData[cardCategory]) cardData[cardCategory] = card;

		return {
			timestamp: target?.timestamp,
			url: target?.data?.pageInfo?.url || '',
			value: value || '',
			currency: target?.data?.currency || '',
			orderId: target?.data?.info?.orderId || '',
			email: profile?.email || '',
			phone: profile?.phone || '',
			onetrackId: profile?.onetrackId || '',
			cardCategory,
			...attributionInfo
		};
	};

	// Mapping over the events array to extract, process and organize data into required format
	const processedData = events.map(processEvent);

	/**
	 * Function to get start and end date from processed data
	 *
	 * @param {Array} processedData - Processed data array.
	 * @returns {Array} An array containing startDate and endDate.
	 */
	function getDates(processedData) {
		const timestamps = processedData.map((item) => Date.parse(item.timestamp));
		const startDate = Math.min(...timestamps);
		const endDate = Math.max(...timestamps);

		return [startDate, endDate];
	}

	/**
	 * Creates a map template for daily timestamps.
	 *
	 * @param {Array} processedData - Processed data array.
	 * @returns {Map} A map with timestamps as keys and zero as initial value.
	 */
	function createDailyTimestampsMap(processedData) {
		const [startDate, endDate] = getDates(processedData);

		let dailyTimestampsMapTemplate = new Map();
		for (let d = new Date(startDate); d <= new Date(endDate); d.setUTCDate(d.getUTCDate() + 1)) {
			dailyTimestampsMapTemplate.set(
				Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
				0
			);
		}
		return dailyTimestampsMapTemplate;
	}

	let dailyTimestampsMapTemplate = createDailyTimestampsMap(processedData);

	/**
	 * Creates a map template for hourly timestamps.
	 *
	 * @param {Array} processedData - Processed data array.
	 * @returns {Map} A map with timestamps as keys and zero as initial value.
	 */
	function createHourlyTimestampsMap(processedData) {
		const [startDate, endDate] = getDates(processedData);

		let hourlyTimestampsMapTemplate = new Map();
		for (let d = new Date(startDate); d <= new Date(endDate); d.setUTCHours(d.getUTCHours() + 1)) {
			hourlyTimestampsMapTemplate.set(
				Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours()),
				0
			);
		}
		return hourlyTimestampsMapTemplate;
	}

	let hourlyTimestampsMapTemplate = createHourlyTimestampsMap(processedData);

	const processedDataWithCategory = {};
	processedData.forEach((item) => {
		if (!processedDataWithCategory[item.cardCategory]) {
			processedDataWithCategory[item.cardCategory] = [];
		}
		processedDataWithCategory[item.cardCategory].push(item);
	});

	/**
	 * `cardsSummary` builds an array of data objects for each category key in `cardData`.
	 * Each object includes properties: name, detailed graph data(`graphDetailed`), daily graph data(`graphDaily`),
	 * hourly graph data(`graphHourly`), and other data from `cardData[key]`.
	 *
	 * @param {object} cardData - Object containing additional data linked to the keys.
	 * @param {Map} dailyTimestampsMapTemplate - A Map used as a template for building daily data map.
	 * @param {Map} hourlyTimestampsMapTemplate - A Map used as a template for building hourly data map.
	 * @returns {object[]} An array of objects, with each object representing summarized data for a particular category.
	 */
	const cardsSummary = Object.keys(cardData).map((key) => {
		const categorizedData = processedDataWithCategory[key];

		let dailyDataMap = new Map(dailyTimestampsMapTemplate);
		let hourlyDataMap = new Map(hourlyTimestampsMapTemplate);

		const graphDetailed = categorizedData.map((item) => {
			let date = new Date(Date.parse(item.timestamp));
			date.setUTCHours(date.getUTCHours(), 0, 0, 0);
			let timestamp = Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours()
			);

			let value = typeof item.value === 'number' ? parseFloat(item.value) : 1;
			hourlyDataMap.set(timestamp, value + (hourlyDataMap.get(timestamp) || 0));

			date.setUTCHours(0, 0, 0, 0);
			timestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
			dailyDataMap.set(timestamp, value + (dailyDataMap.get(timestamp) || 0));

			return {
				time: Date.parse(item.timestamp),
				value
			};
		});

		const graphDaily = Array.from(dailyDataMap, ([time, value]) => ({
			time,
			value: parseFloat(value.toFixed(2))
		}));

		const graphHourly = Array.from(hourlyDataMap, ([time, value]) => ({
			time,
			value: parseFloat(value.toFixed(2))
		}));

		return {
			name: key,
			graphDetailed,
			graphDaily,
			graphHourly,
			data: cardData[key]
		};
	});

	return {
		processedData,
		cardsSummary
	};
};

/**
 * Creates a summary row for presentation purposes based on processed data.
 *
 * @param {Array} processedData - The processed data to base the summary on.
 * @returns {Object} An object representing the summary row.
 */
const tableSummary = (processedData: CustomEventDataType[]) => {
	let summary = {
		totalValue: 0, // It will contain float numbers while performing addition.
		emailCount: 0,
		phoneCount: 0,
		clickIdExistsCount: 0,
		adIdCount: 0,
		adSetIdCount: 0,
		campaignIdCount: 0,
		onetrackIdCount: 0,
		totalEvents: processedData.length
	};

	for (let item of processedData) {
		if ('value' in item) {
			summary.totalValue += Number(item.value); // Keep adding them as numbers.
		}

		// Count email addresses, phone numbers, onetrackIds and clickIdExists with whiteCheckmark
		if ('email' in item) summary.emailCount++;
		if ('phone' in item) summary.phoneCount++;
		if ('oneTrackId' in item) summary.onetrackIdCount++;
		if (item.clickIdExists === ':white_check_mark:') summary.clickIdExistsCount++;

		// Count adId, adSetId, and campaignId
		if ('adId' in item) summary.adIdCount++;
		if ('adSetId' in item) summary.adSetIdCount++;
		if ('campaignId' in item) summary.campaignIdCount++;
	}

	summary.totalValue = Number(summary.totalValue.toFixed(2));

	// Rest leave empty in the summary row
	return summary;
};

export function createEventsColumns(events: CustomEventDataType[], renderPurchaseColumns: boolean) {
	let summary = tableSummary(events);
	let generatedColumns = [
		GetColumnDefinition(
			'timestamp',
			'Date',
			'none',
			`Summary (${events.length})`,
			(cell: string) => moment(cell).format('DD.MM.YYYY HH:mm '),
			true,
			false,
			false
		),
		GetColumnDefinition('category', 'Category', 'none', ''),
		GetColumnDefinition('clickIdExists', 'Click ID', 'none', ''),
		GetColumnDefinition('cardCategory', 'Platform', 'none', ''),
		GetColumnDefinition('email', 'E-mail', 'none', summary.emailCount),
		// GetColumnDefinition('url', 'URL', 'none', ''),
		GetColumnDefinition('phone', 'Phone', 'none', summary.phoneCount),
		GetColumnDefinition('source', 'Source', 'none', ''),
		GetColumnDefinition('utmSource', 'UTM Source', 'none', summary.campaignIdCount),
		GetColumnDefinition('utmMedium', 'UTM Medium', 'none', summary.adSetIdCount),
		GetColumnDefinition('utmCampaign', 'UTM Campaign', 'none', summary.adIdCount),
		// GetColumnDefinition('isAd', 'Is Ad?', 'none', ""),
		GetColumnDefinition('campaignId', 'Campaign ID', 'none', summary.campaignIdCount),
		GetColumnDefinition('adSetId', 'Ad Set ID', 'none', summary.adSetIdCount),
		GetColumnDefinition('adId', 'Ad ID', 'none', summary.adIdCount),
		GetColumnDefinition('onetrackId', 'OneTrack ID', 'none', summary.onetrackIdCount)
	];
	let firstElement = events[0];
	if (renderPurchaseColumns) {
		generatedColumns.push(
			GetColumnDefinition('value', 'Order Value', 'none', summary.totalValue, (cell: string) => {
				return currencyCustomSymbolFormatter(Number(cell), firstElement.currency ?? 'EUR');
			})
		);
		generatedColumns.push(GetColumnDefinition('orderId', 'Order ID', 'none', summary.adIdCount));
	}
	return generatedColumns;
}
