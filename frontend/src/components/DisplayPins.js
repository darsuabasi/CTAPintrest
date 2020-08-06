import React from "react";
import Pin from '../components/pins/allPins/Pin';

const DisplayPins = ({ allPins }) => {
  const showPins = allPins.map((pin, i) => {
    return (
      <Pin
        key={i}
        id={pin.id}
        username={pin.creator_id}
        timestamp={pin.timestamp}
        post_image_url={pin.imageUrl}
        body={pin.note}
      />
    );
  });

  return <div className="pinsContainer">{showPins}</div>;
};

export default DisplayPins;