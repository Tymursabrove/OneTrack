<script lang="ts" context="module">
  export type PlatformValueType = string | number

  export interface IPlatformSummarySetup {
    platform: string
    title: string
    value: string
    rows: {
      title: string
      values: [PlatformValueType, PlatformValueType]
    }[]
  }
</script>

<script lang="ts">
  export let setup: IPlatformSummarySetup
</script>

<div class="platform-summary">
  <div class="platform-summary__title">{setup.title}</div>
  <div class="platform-summary__value">{setup.value}</div>

  <table class="platform-summary__table">
    <thead>
      <tr>
        <th>OneTrack</th>
        <th />
        <th>{setup.platform}</th>
      </tr>
    </thead>
    <tbody>
      {#each setup.rows as row}
        <tr>
          <td><div class="_value _onetrack-value">{row.values[0]}</div></td>
          <td><div class="_title">{row.title}</div></td>
          <td><div class="_value _platform-value">{row.values[1]}</div></td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .platform-summary {
    text-align: center;
    &__title {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      text-align: center;
    }
    &__value {
      text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    &__table {
      margin-top: 10px;
      width: 100%;
      thead > tr {
        border-bottom: 1px solid #8b939e;
      }
      th {
        padding-bottom: 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
      }
      tr {
      }
      td {
        padding: 15px 0 0;
        &:nth-child(2) {
          padding-left: 10px;
          padding-right: 10px;
        }
        ._title {
          text-align: center;
          font-family: Montserrat;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
        ._value {
          display: flex;
          padding: 5px;
          justify-content: center;
          align-items: center;
          flex: 1 0 0;
          align-self: stretch;
          border-radius: 6px;
          font-size: 14px;
          @media (min-width: 1550px) {
            padding-left: 20px;
            padding-right: 20px;
            font-size: 16px;
          }
          &._onetrack-value {
            background: radial-gradient(75.27% 75.27% at 68.03% 31.76%, #11c1a2 0%, #008b72 100%);
          }

          &._platform-value {
            background: radial-gradient(75.27% 75.27% at 68.03% 31.76%, #e14343 0%, #860a0a 100%);
          }
        }
      }
    }
  }
</style>
