import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  {
    userName: "midudev",
    name: "Miguel Ángel Durán",
    isFollowing: true,
  },
  {
    userName: "pherald",
    name: "Pablo Hernández",
    isFollowing: false,
  },
  {
    userName: "TMlol",
    name: "Javier Melendez",
    isFollowing: true,
  },
  {
    userName: "KRmiss",
    name: "Karen Rods",
    isFollowing: true,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map((user) => {
        const { userName, name, isFollowing } = user;
        return (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        );
      })}
    </section>
  );
}
