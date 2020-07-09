<template>
  <sui-menu attached="top">
    <sui-dropdown item icon="wrench" simple>
      <sui-dropdown-menu>
        <sui-dropdown-item>Open</sui-dropdown-item>
        <sui-dropdown-item>Save...</sui-dropdown-item>
        <sui-dropdown-item>Edit Permissions</sui-dropdown-item>
        <sui-dropdown-divider />
        <sui-dropdown-header>API</sui-dropdown-header>
        <sui-dropdown-item>Documentation</sui-dropdown-item>
         <sui-dropdown-divider />
        <sui-dropdown-header>SOCIALS</sui-dropdown-header>
        <sui-dropdown-item>
          <sui-icon name="dropdown"></sui-icon>
          <span class="text">Medias</span>
          <sui-dropdown-menu>
            <sui-dropdown-item>GitHub</sui-dropdown-item>
            <sui-dropdown-item>Linked In</sui-dropdown-item>
            <sui-dropdown-item>X-Ing</sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>
    <sui-menu-menu position="right">
      <sui-menu-item right>
        <sui-input transparent icon="search" placeholder="Search..." />
      </sui-menu-item>
    </sui-menu-menu>
  </sui-menu>
</template>

<script>
export default {};
</script>

<style>
</style>