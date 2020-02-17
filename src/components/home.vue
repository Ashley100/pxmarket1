<template>
<div class="main-home">
    <MainHeader />
    <MainContent />
    <!-- <div class="container">
        <h1>Home</h1>
    </div> -->
</div>
</template>

<script>
import MainHeader from './header/header'
import MainContent from './content/content'

export default {
    components: {
        MainHeader,
        MainContent
    }
}
</script>
