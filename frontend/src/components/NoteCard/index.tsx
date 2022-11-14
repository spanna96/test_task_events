import { formatName, capitalizeFirstLetter } from "../../helpers";
import { eventsColors } from "./eventsColors";
import { Note, NumberValue } from "../../types";

import "./NoteCard.css";

type Props = {
  note: Note;
};

function NoteCard({ note }: Props) {
  const color = eventsColors[note.name];

  const getValues = (values: string[] | NumberValue[] = []) => {
    if (values && values.length) {
      return [...values].reduce(
        (r: string, val: string | NumberValue, i: number) => {
          const formatedVal =
            typeof val === "string"
              ? capitalizeFirstLetter(val)
              : `${val?.value} ${val?.unit}`;

          return r + `${i ? ", " : " "}` + formatedVal;
        },
        ": "
      );
    }
  };

  return (
    <div className="NoteCard">
      <div className="NoteCard-type-container">
        <div className="NoteCard-type" style={{ backgroundColor: color }}>
          {formatName(note.name)}
        </div>
        <div className="NoteCard-date-mobile">{note.formattedDate}</div>
      </div>
      <div>
        {note.resources?.map(({ id, values, details, code }) => {
          return (
            <div key={id} className="NoteCard-resource">
              <div className="NoteCard-detail">
                {capitalizeFirstLetter(details)}
                {getValues(values)}
              </div>
              <div className="NoteCard-code">{code}</div>
              <div className="NoteCard-date">{note.formattedDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NoteCard;
