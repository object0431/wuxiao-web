<template>
    <div class="eventsTabsPageCont">
        <div v-if="eventsDataList && eventsDataList.length > 0" class="eventsTabsListCont">
            <div v-for="(item , index) in eventsDataList" :key="index" class="eventsTabsItem" @click="eventsTabsItemClick(item)">
                <div class="eventsItemTitle">
                    <div class="eventsItemTitleMarkers"></div>
                    <div class="eventsItemTitleInfo">{{ item.title }}</div>
                </div>
                <div class="eventsItemContentInfo">
                    {{ item.content }}
                </div>
                <div class="eventsItemMoreBox">
                    <!-- <img class="moreImg" v-if="index === 0" src="@/assets/image/main_more.png"/> -->
                    <img class="moreImg" src="@/assets/image/main_more_un.png"/>
                </div>
            </div>
        </div>
        <div v-else class="noDataCont">
            暂无数据
        </div>
    </div>
</template>
<script>
export default {
    created() {

    },
    mounted() {
    },
    watch: {
    },
    props: {
        eventsDataList: {
            type: Array,
            default: [{}],
        },
        type: {
            type: String,
            default: "AWARD",
        }
    },
    data() {
        return {

        };
    },

    methods: {
        eventsTabsItemClick(row){
            switch (this.type) {
                case "AWARD":
                    this.$router.push({ name: "awardSettingsView",  params: { type: this.type , attrCode:row.attrCode, attrDesc:row.attrDesc} });
                    break;
                case "HD":
                    this.$router.push({ name: "eventArrangementsNewsView", params: {type: this.type, id: row.id }, });
                    break;
                case "XW":
                    this.$router.push({ name: "eventArrangementsNewsView", params: {type: this.type, id: row.id }, });
                    break;
                default:
                    break;
            }
        }
    },
};

</script>
<style lang="scss" scoped>
.eventsTabsPageCont {
    // margin-left: 50%;
    // width: 50%;
    // height: 100%;
    flex: 1;
    overflow: hidden;
    // padding: 24px 0px;
    display: flex;
    align-items: center;
    .noDataCont{
        color: #909399;
        font-size: 14px;
        line-height: 60px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .eventsTabsListCont{
        width: 100%;
        height: 100%;
        overflow: auto;
        .eventsTabsItem{
            padding: 0px 4px 0px 48px;
            width: calc(100% - 52px);
            cursor:pointer;
            // height: 100px;
            color: #333333;
            .eventsItemTitle {
                padding-top: 5px;
                display: flex;
                // justify-content: center;
                align-items: center;
                .eventsItemTitleMarkers {
                    width: 6px;
                    height: 6px;
                    background: #5991FF;
                    border-radius: 6px;
                }
                .eventsItemTitleInfo {
                    width: calc(100% - 6px);
                    padding-left: 4px;
                    height: 22px;
                    font-size: 16px;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    line-height: 22px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; //（行数）
                    -webkit-box-orient: vertical;
                }
            }
            .eventsItemContentInfo{
                padding: 6px 0px 0px 13px;
                font-size: 13px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                line-height: 18px;
                opacity: 56%;
                max-height: 36px;
                overflow: hidden;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-line-clamp: 2; //（行数）
                // -webkit-box-orient: vertical;
            }
            .eventsItemMoreBox{
                height: 28px;
                width: 100%;
                // display: flex;
                // justify-content: right;
                // align-items: center;  
                text-align: right;
                line-height: 28px;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                .moreImg{
                    width: 55px;
                    height: 18px;
                    object-fit: cover;
                }
            }
        }
        // .eventsTabsItem:first-child{
        //     color: #5991FF;
        // }
    }
    .eventsTabsItem:hover{
        background: #eef4ff;
        .eventsItemContentInfo{
            color: #5991FF;
        }
    }
}
</style>