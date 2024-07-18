// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/index.vue';
import UploadByFile from '../views/uploadApkFile.vue';
import UploadIndex from '../views/UploadSampleApk.vue';
import ResultsQuery from "../views/ResultsQuery.vue";
import EigenvaluePage from "../views/ReportPages/EigenvaluePage.vue"
import PredictDataPage from "../views/ReportPages/PredictDataPage.vue";
import ShowModels from "../views/AboutPages/ShowModels.vue";
import Barchart from "../views/AboutPages/Barchart.vue";
import UrlAndAddress from "../views/ReportPages/UrlAndAddress.vue";
import QRCodeUpload from "../views/QRCodeUpload.vue";
import UploadByUrl from "../views/UploadByUrl.vue";
// import QrCodeDownload from '../views/QrCodeDownload.vue'; // 假设你有一个 QrCodeDownload.vue 视图
// import UrlDownload from '../views/UrlDownload.vue'; // 假设你有一个 UrlDownload.vue 视图
// import About from '../views/About.vue'; // 假设你有一个 About.vue 视图
//
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/apkFileUpload',
        name: 'UploadByFile',
        component: UploadByFile,
    },
    {
        path: '/uploadIndex',
        name: 'UploadIndex',
        component: UploadIndex
    },
    {
        path: '/ResultsQueryPage',
        name: 'ResultsQueryPage',
        component: ResultsQuery
    },
    {
        path: '/EigenvaluePage',
        name: 'EigenvaluePage',
        component: EigenvaluePage
    },
    {
        path: '/PredictDataPage',
        name: 'PredictDataPage',
        component: PredictDataPage
    },
    {
        path: '/ShowModels',
        name: 'ShowModels',
        component: ShowModels
    },
    {
        path: '/ShowBarChart',
        name: "ShowBarChart",
        component: Barchart
    },
    {
        path: '/UrlAndAddress',
        name: 'UrlAndAddress',
        component: UrlAndAddress
    },
    {
        path: '/qrcode-upload',
        name: 'QrCodeUpload',
        component:QRCodeUpload,
    },
    {
        path: '/url-upload',
        name: 'urlUpload',
        component: UploadByUrl,
    }
    // {
    //     path: '/url-download',
    //     name: 'UrlDownload',
    //     component: UrlDownload,
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About,
    // },    // {
    //     path: '/upload',
    //     name: 'Upload',
    //     component: Upload,
    // },
    // {
    //     path: '/qrcode-download',
    //     name: 'QrCodeDownload',
    //     component: QrCodeDownload,
    // },
    // {
    //     path: '/url-download',
    //     name: 'UrlDownload',
    //     component: UrlDownload,
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: About,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
