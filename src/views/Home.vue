<template>
    <div>
        <!-- 首页顶部导航 -->
        <div class="top-nav">
            <img src="../assets/indexNavPic.png" alt />
            <!-- 商品分类 -->
            <van-tabs>
                <van-tab
                    v-for="(item) in tabsList"
                    :title="item.category_name"
                    :key="item.category_id"
                >
                    <!-- {{item}} -->
                </van-tab>
            </van-tabs>
        </div>
        <div class="container">
            <!-- banner -->
            <van-swipe>
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image.ad_pic" />
                </van-swipe-item>
            </van-swipe>

            <van-search disabled placeholder="搜索喜欢的商品" />

            <!-- 热销产品 -->
            <div class="hot-porduct">
                <div class="text">热销产品</div>
            </div>
        </div>

        <!-- tabbar -->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
// @ is an alias to /src
import { Tabbar, TabbarItem, Tab, Tabs, Swipe, SwipeItem, Search } from "vant";

export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Search.name]: Search
    },
    data() {
        return {
            active: 0,
            tabsList: [],
            images: []
        };
    },
    created() {
        // 获取首页位置banner
        this.getBanner(1);
        this.getCategory();
        this.getHotPorductAd();
    },
    methods: {
        // 获取banner图
        // 1:首页轮播图, 2:首页今日特惠, 3:首页热销产品, 4:购物车猜你喜欢, 6:分类页轮播图
        getBanner(position) {
            this.get("/api/ads.php?act=get_ad", {
                position: position,
                quantity: 10
            }).then(res => {
                this.images = res.result;
            });
        },

        // 获取商品列表
        getCategory() {
            this.get("/api/category.php?act=get_category").then(res => {
                console.log(res);
                this.tabsList = res.result;
            });
        },

        // 获取热销产品
        getHotPorductAd() {
            this.get("/api/goods_list.php?act=hot", {
                quantity: 10,
                goods_type: 0
            }).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style>
.container {
    padding: 1.2rem 0.2rem;
}
.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0.2rem;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
}
.top-nav img {
    width: 2.25rem;
}
.van-tab {
    font-size: 0.45rem;
}
.van-swipe {
    border-radius: 0.2rem;
    overflow: hidden;
}
.van-tabs {
    padding-left: 0.3rem;
    width: calc(100% - 2.25rem - 0.5rem);
}
.van-swipe img {
    width: 100%;
}
.van-tabs__line {
    background-color: #60b430;
}
.van-swipe__indicator {
    width: 0.3rem;
    height: 0.3rem;
    background: #aaa;
}
.van-search {
    padding-left: 0;
    padding-right: 0;
}
.hot-porduct {
    width: 100%;
    font-size: 0.45rem;
}

.hot-porduct .text {
    position: relative;
}
</style>
