const Heading = ({ label }: { label: string }) => {
  return (
    <div className="py-3 leading-4 px-5 bg-purple-primary border border-light-purple rounded-xl font-medium tracking-wide w-fit">
      {label}
    </div>
  );
};

export default Heading;
