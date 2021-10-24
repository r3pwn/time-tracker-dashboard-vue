<template>
  <div class="profile-tile">
    <div class="profile-report">
      <img class="profile-picture" :src="`./${state.profileImage}`">
      <div class="profile-info">
        Report For
        <div class="profile-name">{{ state.name }}</div>
      </div>
    </div>
    <div class="timespan-selection">
      <button v-for="(timespan, index) in timespans"
              :key="index"
              :class="{'selected': timespan.value === timespanPreference}"
              @click.stop="setTimespan(timespan.value)">
              {{ timespan.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import PreferencesStore from '../stores/PreferencesStore';
import ProfileStore from '../stores/ProfileStore';

export default {
  name: 'ProfileTile',
  data () {
    return {
      timespans: [
        {
          name: 'Daily',
          value: 'daily'
        },
        {
          name: 'Weekly',
          value: 'weekly'
        },
        {
          name: 'Monthly',
          value: 'monthly'
        }
      ]
    }
  },
  computed: {
    ...mapState('preferences', ['timespanPreference']),
    state () {
      return this.$store.state.profile;
    }
  },
  created () {
    if (!this.$store.hasModule('profile')) {
      this.$store.registerModule('profile', ProfileStore);
    }
    if (!this.$store.hasModule('preferences')) {
      this.$store.registerModule('preferences', PreferencesStore);
    }
  },
  methods: {
    ...mapActions('preferences', ['setTimespan'])
  }
}
</script>

<style lang="scss">
  @import '../styles/tiles.css';
  @import '../styles/responsive.scss';

  .profile-tile {
    display: inline-grid;
    background-color: var(--color-tile);
    border-radius: var(--border-radius);

    .profile-report {
      background-color: var(--color-main);
      border-radius: var(--border-radius);
      padding: 0 1.5em;

      @include mobile-styles {
        display: flex;
        flex-direction: row;
      }

      .profile-picture {
        height: 75px;
        width: 75px;
        border: 3px solid white;
        border-radius: 50%;
        margin-top: 2em;
        margin-bottom: 2em;
        margin-right: 1em;

        @include mobile-styles {
          height: 50px;
          width: 50px;
          align-self: center;
        }
      }

      .profile-info {
        color: var(--color-pale-blue);
        @include mobile-styles {
          align-self: center;
        }
      }
      .profile-name {
        color: white;
        font-size: 2em;
        font-weight: 300;
        padding-bottom: 1em;

        @include mobile-styles {
          font-size: 1.5em;
          padding-bottom: 0;
        }
      }
    }

    .timespan-selection {
      display: flex;
      flex-direction: column;
      margin-top: auto;
      margin-bottom: auto;

      @include mobile-styles {
        flex-direction: row;
        justify-content: space-around;
      }

      button {
        background: none;
        border: none;
        text-align: left;
        width: fit-content;
        font-family: var(--font-family);
        font-size: 16px;
        color: var(--color-pale-blue);
        padding: 0.5em 1.5em;
        transition: color 250ms ease-in-out;

        &.selected {
          color: white;
        }

        &:hover {
          cursor: pointer;
          color: white;
        }
      }
    }
  }
</style>
