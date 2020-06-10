<template>
    <v-app>
        <v-navigation-drawer app>
            <!-- -->
        </v-navigation-drawer>

        <v-app-bar app>
            <!-- -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app>
            all rights reserved...
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: "App.vue",
        data: () => ({
            collapseOnScroll: true,
        }),
    }
</script>

<style scoped>

</style>