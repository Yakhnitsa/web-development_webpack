<template>
    <div>
        <h1>Test page</h1>
        <p>{{text}}</p>
    </div>

</template>

<script>
    export default {
        name: "test-page",
        data: function(){
            return{
                text:'component text'
            }
        }

    }
</script>

<style scoped>
    p{
        font-size: 2em;
        text-align: left;
    }
</style>