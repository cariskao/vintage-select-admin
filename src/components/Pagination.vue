<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
        :class="isDisabled('pre')"
      >
        <a class="page-link" href="#" aria-label="Previous"
          @click.prevent="getProducts(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="pageActive(page)"
      >
        <a class="page-link" href="#"
          @click.prevent="getProducts(page)"
        >
          {{page}}
        </a>
      </li>
      <li class="page-item"
        :class="isDisabled('next')"
      >
        <a class="page-link" href="#" aria-label="Next"
          @click.prevent="getProducts(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('product', ['pagination']),
  },
  methods: {
    ...mapActions('product', ['getProducts']),
    pageActive(page){
      return {
        active: this.pagination.current_page === page
      }
    },
    isDisabled(type){
      return {
        disabled: !this.pagination[`has_${type}`]
      }
    }
  }
}
</script>

<style>

</style>
