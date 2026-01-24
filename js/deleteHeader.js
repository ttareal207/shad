/***********************************************
> Modified for Locket 15s by @ttareal07
***********************************************/	

const version = 'V2.0.0 Locket';

// Xóa các header nhận dạng và tracking
function removeHeaders(headers) {
  const headersToRemove = [
    // RevenueCat headers
    'X-RevenueCat-ETag',
    'X-RevenueCat-SDK-Version', 
    'X-RevenueCat-Timezone',
    'X-RevenueCat-Locale',
    
    // Authentication headers
    'Authorization',
    'authorization',
    'X-Auth-Token',
    'X-API-Key',
    'X-Access-Token',
    
    // Device identification
    'X-Device-ID',
    'X-Device-Model',
    'X-Device-OS',
    'X-App-Version',
    
    // Tracking headers
    'X-Request-ID',
    'X-Correlation-ID',
    'X-Session-ID',
    
    // Locket specific
    'X-Locket-Device',
    'X-Locket-Version',
    'X-Locket-Signature'
  ];
  
  headersToRemove.forEach(header => {
    delete headers[header];
    // Also try lowercase version
    delete headers[header.toLowerCase()];
  });
  
  return headers;
}

// Thêm header giả lập để unlock 15s
function addLocketHeaders(headers) {
  // Giả lập device premium
  headers['X-Premium-User'] = 'true';
  headers['X-Subscription-Tier'] = 'premium_max';
  headers['X-Video-Unlock'] = '15s_enabled';
  
  // Giả lập user agent của iOS device mới
  headers['User-Agent'] = 'Locket/2.0.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
  
  // Thêm timestamp để tránh cache
  headers['X-Timestamp'] = Date.now().toString();
  
  return headers;
}

// Main function
function main() {
  const url = $request.url;
  let headers = $request.headers;
  
  console.log(`[deleteHeader ${version}] Processing: ${url}`);
  
  // Chỉ xử lý cho Locket/RevenueCat domains
  const isLocketDomain = url.includes('locket.com') || 
                         url.includes('getlocket.com') ||
                         url.includes('revenuecat.com');
  
  if (isLocketDomain) {
    // Step 1: Xóa headers nhạy cảm
    headers = removeHeaders(headers);
    
    // Step 2: Thêm headers unlock
    headers = addLocketHeaders(headers);
    
    console.log(`[deleteHeader ${version}] Headers modified for Locket 15s unlock`);
  }
  
  $done({ headers: headers });
}

// Execute
try {
  main();
} catch (error) {
  console.log(`[deleteHeader ${version}] Error: ${error}`);
  $done({});
}
