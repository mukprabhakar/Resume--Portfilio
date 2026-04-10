import React, { useEffect } from 'react'

const GoogleAdSense = ({ adSlot, adFormat = 'auto', adLayout = '', adLayoutKey = '', style = {} }) => {
  useEffect(() => {
    // Push ad to AdSense queue
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div className="my-8" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={import.meta.env.VITE_ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout-key={adLayoutKey}
        data-ad-layout={adLayout}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default GoogleAdSense
