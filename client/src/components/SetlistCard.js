import React from "react";
import { Card } from "@blueprintjs/core";

const SetlistCard = props => {
  return (
    <div className='result-card-container'>
      <Card>
        <div className='setlist-card-result-header'>
          {props.details && (
            <h2>
              {props.setlist.artist}'s{" "}
              {props.setlist.tour ? props.setlist.tour : "Tour Name N/A"}
            </h2>
          )}
          <h5>{props.setlist.date}</h5>
          <h5>
            {props.setlist.venue} - {props.setlist.city}
          </h5>
        </div>

        <h4>Songs</h4>
        <ol className='.modifier'>
          {props.setlist.songs &&
            props.setlist.songs.map(song => {
              return <li key={song.name}>{song.name}</li>;
            })}
        </ol>
        {!props.setlist.songs && <p>No songs found</p>}
        {props.setlist.encore && <h4>Encore</h4>}
        <ol className='.modifier'>
          {props.setlist.encore &&
            props.setlist.encore.map(song => {
              return <li key={song.name}>{song.name}</li>;
            })}
        </ol>
      </Card>
    </div>
  );
};

export default SetlistCard;
