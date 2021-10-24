<template>
  <div id="app">
    <div class="activities">
      <ProfileTile />
      <ActivityTile v-for="(activity, index) in activities"
                    :key="index"
                    :activity="activity" />
    </div>
  </div>
</template>

<script>
import ActivityTile from './components/ActivityTile.vue';
import ProfileTile from './components/ProfileTile.vue';

import ActivityProvider from './providers/ActivityProvider';

export default {
  name: 'App',
  components: {
    ActivityTile,
    ProfileTile
  },
  data () {
    return {
      activities: null
    }
  },
  mounted () {
    ActivityProvider.getActivities().then((data) => {
      this.activities = data;
    });
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap');

@import 'styles/colors.css';
@import 'styles/responsive.scss';

:root {
  --font-family: 'Rubik', sans-serif;
}

html {
  min-height: 100%;
  background-color: var(--color-background);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  width: 100%;
}

#app {
  font-family: var(--font-family);
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.activities {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 2em;
    row-gap: 2em;
    margin: 0;
    transition: all 250ms ease-in-out;

    @include mobile-styles {
      margin: 0 1em;
      grid-template-columns: 1fr;
    }
    
    @include tablet-styles {
      margin: 0 3em;
    }

    @include desktop-styles {
      margin: 0 6em;
    }

    @include large-desktop-styles {
      margin: 0 8em;
    }

    .profile-tile {
      grid-row: 1 / 3;
      @media (max-width: 649px) {
        grid-row: 1;
      }
    }
}

@media (min-width: 1400px) {
  .activities {
    margin: 0 6em;
  }
}
</style>
