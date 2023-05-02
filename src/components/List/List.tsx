import "./list.css";

type Task = {
  title: string;
  description: string;
};

type Props = {
  items: Task[];
  onClick: (index: number) => void;
};

const List = ({ items, onClick }: Props) => {
  return (
    <ul className="task">
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            onClick(index);
          }}
        >
          <h2 className="task-title">{item.title}</h2>
          <div className="task-desc">{item.description}</div>
        </li>
      ))}
    </ul>
  );
};

export default List;
