type Props = {
  message: string;
};

export const CommentDisplay = ({ message }: Props) => {
  return <div className="flex-1 w-full px-3">{message}</div>;
};
