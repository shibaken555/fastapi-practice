import { getStoredData } from "./utils/storageManager.js";

const parsedValue = getStoredData('responseCompanyInfo');
if (parsedValue) {
    console.log('取得したデータ:', parsedValue);
    // 受け取ったレスポンスから企業情報を表示させる
    const displayedCompanyInfo = document.createTextNode(parsedValue.company_info);
    const companyInfo = document.querySelector('#companyInfo');
    companyInfo.appendChild(displayedCompanyInfo);
} else {
    console.log('データが見つかりませんでした');
}