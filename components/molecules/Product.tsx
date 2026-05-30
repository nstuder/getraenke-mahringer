interface ProductProps {
  name: string;
  verkaufsmenge: string;
  marke: string;
  beschreibung?: string;
}

export default function Product({ name, verkaufsmenge, marke, beschreibung }: ProductProps) {
  return (
    <div className="py-3 px-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="text-lg font-bold text-darkblue leading-tight">{name}</div>
        <div className="text-sm text-gray-600">{marke}</div>
        {beschreibung && <div className="text-xs text-gray-800 italic mt-1">{beschreibung}</div>}
      </div>
      <div className="text-right ml-4">
        <span className="text-sm font-semibold text-black whitespace-nowrap">{verkaufsmenge.replaceAll("\"", "")}</span>
      </div>
    </div>
  );
}
