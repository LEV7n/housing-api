<template>
  <div>
    <!-- Form -->
    <el-form :model="searchParams" @submit.prevent="search">
      <!-- Name -->
      <el-form-item label="Name">
        <el-input v-model="searchParams.name" placeholder="Enter name" />
      </el-form-item>

      <!-- Bedrooms -->
      <el-form-item label="Bedrooms">
        <el-input-number v-model="searchParams.bedrooms" :min="1" />
      </el-form-item>

      <!-- Bathrooms -->
      <el-form-item label="Bathrooms">
        <el-input-number v-model="searchParams.bathrooms" :min="1" />
      </el-form-item>

      <!-- Storeys -->
      <el-form-item label="Storeys">
        <el-input-number v-model="searchParams.storeys" :min="1" />
      </el-form-item>

      <!-- Garages -->
      <el-form-item label="Garages">
        <el-input-number v-model="searchParams.garages" :min="1" />
      </el-form-item>

      <!-- Price Range -->
      <el-form-item label="Price Range">
        <el-input-number v-model="searchParams.price_min" placeholder="Min price" />
        <el-input-number v-model="searchParams.price_max" placeholder="Max price" />
      </el-form-item>

      <!-- Search -->
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="search"
        >Search</el-button>
      </el-form-item>
    </el-form>

    <!-- Table -->
    <el-table
      :data="results.data"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="bedrooms" label="Bedrooms" />
      <el-table-column prop="bathrooms" label="Bathrooms" />
      <el-table-column prop="storeys" label="Storeys" />
      <el-table-column prop="garages" label="Garages" />
      <el-table-column
        prop="price"
        label="Price"
        :formatter="formatPrice"
      />
    </el-table>

    <!-- Pagination -->
    <el-pagination
      v-if="results?.data?.length"
      background
      layout="prev, pager, next"
      :total="results.total"
      :page-size="results.per_page"
      :current-page="results.current_page"
      @current-change="handlePageChange"
    />

    <!-- Alert -->
    <el-alert
      v-if="noResults"
      type="info"
      title="No results found."
      show-icon
    />
  </div>
</template>

<script src="./index.js"></script>