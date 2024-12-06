import { Metadata } from './Metadata';
import { PublicacionesSolicitadas } from './PublicacionesSolicitadas';

export default function CompradorPerfil() {
  return (
    <div className="mx-auto p-6 bg-white w-full h-full">
      <div className="flex gap-6 h-full">
        {/* Left Column */}
        <Metadata />

        {/* Right Column */}
        <PublicacionesSolicitadas />
      </div>
    </div>
  );
}
