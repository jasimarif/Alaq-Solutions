import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";

const DirectionPad = ({bgColor}) => {
  return (
    <div className={`w-20 h-20 ${bgColor} bg-opacity-40 rounded-2xl relative`}>
      <ArrowRight className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white/90 w-6 h-6" />
      <ArrowUp className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/90 w-6 h-6" />
      <ArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/90 w-6 h-6" />
      <ArrowLeft className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white/90 w-6 h-6" />
    </div>
  );
}
export default DirectionPad;
