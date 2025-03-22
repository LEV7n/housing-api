<template>
  <div>
    <el-form :model="searchParams" @submit.prevent="search">
      <el-form-item label="Name">
        <el-input v-model="searchParams.name" placeholder="Enter name"></el-input>
      </el-form-item>

      <el-form-item label="Bedrooms">
        <el-input-number v-model="searchParams.bedrooms" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="Bathrooms">
        <el-input-number v-model="searchParams.bathrooms" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="Storeys">
        <el-input-number v-model="searchParams.storeys" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="Garages">
        <el-input-number v-model="searchParams.garages" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item label="Price Range">
        <el-input-number v-model="searchParams.price_min" placeholder="Min price"></el-input-number>
        <el-input-number v-model="searchParams.price_max" placeholder="Max price"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="search">Search</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="results.data" v-loading="loading" style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="bedrooms" label="Bedrooms"></el-table-column>
      <el-table-column prop="bathrooms" label="Bathrooms"></el-table-column>
      <el-table-column prop="storeys" label="Storeys"></el-table-column>
      <el-table-column prop="garages" label="Garages"></el-table-column>
    </el-table>

    <el-pagination
      v-if="results?.data?.length"
      background
      layout="prev, pager, next"
      :total="results.total"
      :page-size="results.per_page"
      :current-page="results.current_page"
      @current-change="handlePageChange"
    ></el-pagination>

    <el-alert v-if="noResults" type="info" title="No results found." show-icon></el-alert>
  </div>
</template>

<script src="./index.js"></script>