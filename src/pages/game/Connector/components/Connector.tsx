import React from "react";
import connectorImage from "../assets/connector.svg";
import Pin from "./Pin";
import "./game.scss";

interface ConnectorProps {
  wires: Array<{ image: string; color: string; targetPin: number }>;
  connections: { [pinIndex: number]: number };
  onWireConnect: (wireIndex: number, pinIndex: number) => void;
  wiresDisabled?: boolean;
}

export default function Connector({
                                    wires,
                                    connections,
                                    onWireConnect,
                                    wiresDisabled = false
                                  }: ConnectorProps) {
  const getWireImageForPin = (pinIndex: number): string | undefined => {
    const wireIndex = connections[pinIndex];
    return wireIndex !== undefined ? wires[wireIndex].image : undefined;
  };

  return (
    <div className="connector">
      <img src={connectorImage} alt="RJ-45 connector" className="connector-image" />

      {Array.from({ length: 8 }, (_, pinIndex) => (
        <Pin
          key={pinIndex}
          pinIndex={pinIndex}
          wireImage={getWireImageForPin(pinIndex)}
          isOccupied={connections[pinIndex] !== undefined}
          onWireDrop={onWireConnect}
          disabled={wiresDisabled}
        />
      ))}
    </div>
  );
}