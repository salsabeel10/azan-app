import React from 'react'
import usePrayerTimeStore from '../store/usePrayerTimeStore'

const RadioButtons = () => {
  const { locationType, setLocationType } = usePrayerTimeStore()
  return (
    <div className="flex gap-4 mt-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="locationType"
          value='manual'
          className="radio radio-info"
          checked={locationType === 'manual'}
          onChange={() => setLocationType('manual')}
        />
        <span>Location</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="locationType"
          value="auto"
          className="radio radio-info"
          checked={locationType === 'auto'}
          onChange={() => setLocationType('auto')}
        />
        <span>Auto</span>
      </label>
    </div>
  )
}

export default RadioButtons
