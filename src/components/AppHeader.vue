<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>

    <div class="mr-auto navbar-nav">
      <div class="nav-item">
        <RouterLink :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ <i class="fas fa-address-book" aria-hidden="true"></i>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
