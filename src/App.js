import "./App.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import GameItem from "./components/gameItem/GameItem";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';


const App = () => {
  const [gamesList, setGamesList] = useState([
    {id:"1", name: "Dota 2", color:"yellow"},
    {id:"2", name: "League of Legends", color:"skyblue"},
    {id:"3", name: "CS:GO", color:"green"},
    {id:"4", name: "World of Warcraft", color:"white"},
    {id:"5",name: "The Witcher 3", color:"pink"}
  ]);


  const reorderGamesList = (e) => {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      setGamesList((prevGamesList) => {
        const oldIdx = prevGamesList.findIndex((game) => game.id === e.active.id);
        const newIdx = prevGamesList.findIndex((game) => game.id === e.over.id);
        return arrayMove(prevGamesList, oldIdx, newIdx);
      });
    }
  };


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  return (
    <DndContext onDragEnd={reorderGamesList} sensors={sensors}>
      <main className='main'>
        <h1>Favorite Games List</h1>
        <ul className='list'>
          <SortableContext items={gamesList.map((game) => game.id)}>
            {gamesList.map((game) => (
              <GameItem key={game.id} id={game.id} color={game.color}>{game.name}</GameItem>
            ))}
          </SortableContext>
        </ul>
      </main>
    </DndContext>
  );
};

export default App;