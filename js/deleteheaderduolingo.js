/******************************************************************
> deleteHeader for Duolingo Max by ttareal07
*******************************************************************/	

const version = 'V1.0.3 - Duolingo Max Special';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Xử lý cho RevenueCat headers
function processRevenueCatHeaders(headers) {
  // Danh sách headers cần xóa
  const headersToDelete = [
    "X-RevenueCat-ETag",
    "x-revenuecat-etag",
    "ETag",
    "etag",
    "If-None-Match",
    "if-none-match",
    "Last-Modified",
    "last-modified",
    "X-Cache",
    "x-cache",
    "X-Amz-Cf-Pop",
    "x-amz-cf-pop",
    "X-Amz-Cf-Id",
    "x-amz-cf-id"
  ];
  
  // Danh sách headers cần sửa giá trị
  const headersToModify = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "X-Request-Id": "duolingo_max_" + Date.now(),
    "X-Duolingo-Subscription": "max"
  };
  
  // Xóa các headers không cần thiết
  headersToDelete.forEach(header => {
    delete headers[header];
  });
  
  // Sửa giá trị các headers
  Object.keys(headersToModify).forEach(header => {
    setHeaderValue(headers, header, headersToModify[header]);
  });
  
  return headers;
}

// Xử lý cho Duolingo API headers
function processDuolingoHeaders(headers) {
  const duolingoHeadersToDelete = [
    "X-Duolingo-ETag",
    "X-Duolingo-Cache",
    "X-Duolingo-Cache-Control",
    "If-Modified-Since",
    "If-Unmodified-Since"
  ];
  
  duolingoHeadersToDelete.forEach(header => {
    delete headers[header];
  });
  
  // Thêm headers đặc biệt cho Duolingo Max
  setHeaderValue(headers, "X-Duolingo-Subscription-Tier", "max");
  setHeaderValue(headers, "X-Duolingo-Features", "explain_my_answer,role_play,unlimited_hearts");
  setHeaderValue(headers, "X-Duolingo-Client-Version", "7.0.0");
  
  return headers;
}

// Phát hiện loại request
function detectRequestType(url, headers) {
  if (url.includes('revenuecat.com') || url.includes('purchase.duolingo.com')) {
    return 'revenuecat';
  } else if (url.includes('duolingo.com') || url.includes('duolingo.cloudfront.net')) {
    return 'duolingo';
  } else if (headers['User-Agent'] && headers['User-Agent'].includes('Duolingo')) {
    return 'duolingo_app';
  }
  return 'general';
}

// Xử lý chính
try {
  let modifiedHeaders = $request.headers;
  const requestType = detectRequestType($request.url, modifiedHeaders);
  
  switch (requestType) {
    case 'revenuecat':
      modifiedHeaders = processRevenueCatHeaders(modifiedHeaders);
      break;
      
    case 'duolingo':
    case 'duolingo_app':
      modifiedHeaders = processDuolingoHeaders(modifiedHeaders);
      modifiedHeaders = processRevenueCatHeaders(modifiedHeaders); // Áp dụng cả revenuecat
      break;
      
    default:
      // Xóa các headers cache chung
      delete modifiedHeaders["ETag"];
      delete modifiedHeaders["If-None-Match"];
      delete modifiedHeaders["Last-Modified"];
      break;
  }
  
  // Luôn đảm bảo có User-Agent hợp lệ
  if (!modifiedHeaders["User-Agent"]) {
    setHeaderValue(modifiedHeaders, "User-Agent", 
      "Duolingo/7.0.0 (iPhone; iOS 17.2; Scale/3.00) Premium/Max");
  }
  
  // Thêm debug header
  setHeaderValue(modifiedHeaders, "X-TTAREAL07-Debug", version);
  
  $done({
    headers: modifiedHeaders
  });
  
} catch (error) {
  // Fallback nếu có lỗi
  console.log(`DeleteHeader Error: ${error}`);
  $done({
    headers: $request.headers
  });
}
