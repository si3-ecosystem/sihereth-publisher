interface TimeLineCardProps {
  from: string;
  to?: string;
  title: string;
}

const TimeLineCard: React.FC<TimeLineCardProps> = ({ from, to, title }) => {
  return (
    <div className="w-full py-5 border-b border-gray-300 flex gap-6 font-bold tracking-wide">
      <p className="font-dm-sans text-[#3E21F3] flex items-center text-3xl">
        {from}
        {to ? ` - ${to}` : ""}
      </p>
      <span className="font-clash-display text-4xl font-medium">{title}</span>
    </div>
  );
};

export default TimeLineCard;
