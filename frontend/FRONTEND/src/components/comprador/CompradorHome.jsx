import { MetadataHome } from './MetadataHome';
import { PublicacionesSolicitadasHome } from './PublicacionesSolicitadasHome';

export default function CompradorHome() {
  return (
    <div className="mx-auto p-6 bg-white w-full h-full">
      <div className="flex gap-6 h-full">
        {/* Left Column */}
        <MetadataHome />

        {/* Right Column */}
        <PublicacionesSolicitadasHome />
      </div>
    </div>
  );
}
