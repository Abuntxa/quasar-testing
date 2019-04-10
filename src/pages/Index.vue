<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <q-item clickable v-ripple v-for="term in listTerms" :key="term">
        <q-item-section>{{ term }}</q-item-section>
      </q-item>
    </q-list>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data: function () {
    return {
      listTerms: []
    }
  },
  mounted: function () {
    // dummy functionality using localStorage plugin
    let savedTerms = this.$q.localStorage.getItem('definition')
    if (!savedTerms) {
      // We save different terms
      savedTerms = ['term 0']
    } else {
      savedTerms.push('term ' + savedTerms.length)
    }
    this.$q.localStorage.set('definition', savedTerms)
    this.listTerms = savedTerms
  }
}
</script>
