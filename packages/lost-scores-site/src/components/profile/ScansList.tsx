import { useState } from "react";
import { MockScan } from "@/data/mockScans";
import ScanCard from "./ScanCard";

interface ScansListProps {
  scans: MockScan[];
  isOwnProfile: boolean;
}

export default function ScansList({ scans, isOwnProfile }: ScansListProps) {
  const [scansList, setScansList] = useState<MockScan[]>(scans);

  const handleDeleteScan = (scanId: string) => {
    setScansList((prev) => prev.filter((scan) => scan.id !== scanId));
  };

  if (scansList.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-xl border border-lavender-500/30 rounded-lg p-12 text-center">
        <div className="text-lavender-300 font-lostbody text-xl mb-2">No Scans Yet</div>
        <p className="text-lavender-400 font-lostdescription">
          {isOwnProfile
            ? "Upload your first scan from the desktop application to get started!"
            : "This user hasn't uploaded any scans yet."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-lavender-300 font-lostdescription text-sm mb-4">
        Showing {scansList.length} {scansList.length === 1 ? "scan" : "scans"}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {scansList.map((scan, index) => (
          <ScanCard
            key={scan.id}
            scan={scan}
            isOwnProfile={isOwnProfile}
            onDelete={isOwnProfile ? handleDeleteScan : undefined}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
