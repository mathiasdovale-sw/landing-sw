interface DividerProps {
  className?: string;
  lineColor?: string;
  backgroundColor?: string;
  padding?: string;
}

export default function Divider({ 
  className = '', 
  lineColor = 'via-gray-300',
  backgroundColor = 'bg-white',
  padding = 'py-8'
}: DividerProps) {
  return (
    <div className={`${backgroundColor} ${padding} ${className}`}>
      <div className={`w-full h-px bg-gradient-to-r from-transparent ${lineColor} to-transparent`}></div>
    </div>
  );
}