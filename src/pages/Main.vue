<template>
    <div>
        <h1>Main page</h1>
        <p>{{text}}</p>
    </div>

</template>

<script>
    export default {
        name: "Main",
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
        text-align: center;
    }
</style>