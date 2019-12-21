import React from "react";
import { Card } from "@blueprintjs/core";

const SetlistCard = props => {
  return (
    <Card>
      <h2>
        {props.setlist.artist}'s{" "}
        {props.setlist.tour ? props.setlist.tour : "Tour Name N/A"}
      </h2>
      <h5>{props.setlist.date}</h5>
      <h5>
        {props.setlist.venue} - {props.setlist.city}
      </h5>
      <ol class='.modifier'>
        {props.setlist.songs &&
          props.setlist.songs.map(song => {
            return <li>{song.name}</li>;
          })}
      </ol>
    </Card>
  );
};

export default SetlistCard;
