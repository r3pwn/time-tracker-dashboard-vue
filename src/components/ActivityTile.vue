<template>
  <div :class="`tile tile-${activity.id}`">
    <div :class="`tile-background tile-${activity.id}-background`">
      <img class="tile-icon" :src="`./icons/icon-${activity.id}.svg`">
    </div>
    <div class="tile-content">
      <div class="title-row">
        <span class="title">
          {{ activity.title }}
        </span>
        <button class="overflow-button">
          <img :src="`./icons/icon-ellipsis.svg`">
        </button>
      </div>
      <div class="current-time">
        {{ currentHours }}
      </div>
      <div class="previous-time">
        {{ previousHours }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PreferencesStore from '../stores/PreferencesStore';

export default {
  name: 'ActivityTile',
  props: {
    activity: Object
  },
  computed: {
    ...mapState('preferences', ['timespanPreference']),
    timeframe () {
      return this.activity.timeframes[this.timespanPreference];
    },
    currentHours () {
      return this.timeframe.current == 1 ? '1hr' : `${this.timeframe.current}hrs`;
    },
    previousHours () {
      let prefix = "";
      switch (this.timespanPreference) {
        case 'daily':
          prefix = "Yesterday - ";
          break;
        case 'weekly':
          prefix = "Last Week - ";
          break;
        case 'monthly':
          prefix = "Last Month - ";
          break;
      }
      return `${prefix}${this.timeframe.previous}${this.timeframe.previous == 1 ? 'hr' : 'hrs'}`;
    }
  },
  created () {
    if (!this.$store.hasModule('preferences')) {
      this.$store.registerModule('preferences', PreferencesStore);
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/tiles.css';
  
  .tile {
    border-radius: var(--border-radius);

    &:hover {
      cursor: pointer;

      .tile-content {
        background-color: var(--color-tile-hover);
      }
    }

    &-background {
      position: relative;
      height: 45px;
      z-index: 1;
      overflow: hidden;
      background-color: var(--color-tile-accent);
      border-radius: var(--border-radius);
      margin-bottom: -1.5em;
      padding-bottom: 1.5em;
    }

    &-icon {
      float: right;
      margin-top: -10px;
      margin-right: 18px;
    }

    &-content {
      position: relative;
      padding: 0.5em 1.5em;
      z-index: 2;
      border-radius: var(--border-radius);
      background-color: var(--color-tile);
      transition: background-color 250ms ease-in-out;

      .title-row {
        display: flex;
        place-content: space-between;
        padding-top: 0.75em;

        .overflow-button {
          background: none;
          border: none;
          transition: filter 200ms ease-in-out;

          &:hover {
            cursor: pointer;
            filter: brightness(1.5);
          }
        }
      }

      .current-time {
        font-weight: 300;
        font-size: xxx-large;
        text-align: left;
        padding-top: .5em;
      }

      .previous-time {
        text-align: left;
        font-size: smaller;
        font-weight: 300;
        color: var(--color-pale-blue);
        padding-bottom: 1em;
      }
    }
  }
</style>
