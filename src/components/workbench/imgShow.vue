<template>
    <div>
        <img :src="base64" class="imgShowPageCont" />
    </div>
</template>

<script>
export default {
    name: 'imgShow',
    props: {
        base64: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
        }
    },
    watch: {
    },
    mounted() {
    },
    computed: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.imgShowPageCont {
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
}
</style>