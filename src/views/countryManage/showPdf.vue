<template>
    <div class="showPdf-page">
        <iframe ref="iframe" id="bdIframe"
            :src="pdfUrl + $route.query.filePath" frameborder="no" scrolling="auto"
            style="width:100%;height:100%;"></iframe>
    </div>
</template>
<script>

export default {
    data() {
        return {
            pdfUrl: '/pdf/web/viewer.html?file=',
            progressRate: null
        }
    },
    mounted() {
        
        window.onbeforeunload = (e) => {
            //关闭页面的默认事件
            e = e || window.event;
            if (e) {
                e.returnValue = '关闭提示';
            }
            //这是pdf文档
            let currentPDF = sessionStorage.getItem('currentPDF')
            let numPages = sessionStorage.getItem('numPages')
            let files = JSON.parse(localStorage.getItem('pdfjs.history')).files
            files.map(item => {
                if (item.fingerprint == currentPDF) {
                    this.progressRate = parseInt((item.page / numPages) * 100)
                }
            })            
        };
    },
    beforeDestroy() {
        // clearInterval(this.clearTimeSet);
    },
    methods: {


    }
}
</script>

<style lang="scss" scoped>
.showPdf-page {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;

    iframe {
        display: block;
    }

    .video-container {
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 20px;

        video {
            width: 100%;
            height: 100%;
        }
    }
}
</style>