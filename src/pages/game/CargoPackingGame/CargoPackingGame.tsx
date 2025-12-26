import { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { useNavigate } from "react-router-dom";
import { useGameState } from "./hooks/useGameState";
import { LeftPanel } from "./components/LeftPanel/LeftPanel";
import { Waybill } from "./components/Waybill/Waybill";
import { CargoView } from "./components/CargoView/CargoView";
import { CustomDragLayer } from "./components/LeftPanel/CustomDragLayer";
import { Notification } from "./components/UI/Notification";
import { Modal } from "./components/UI/Modal";
import { HelpButton } from "./components/UI/HelpButton";
import { HelpModal } from "./components/UI/HelpModal";
import { Button } from "../../../components/Button/Button";
import classes from "./CargoPackingGame.module.scss";

const CargoPackingGame = () => {
  const navigate = useNavigate();

  const {
    state,
    currentCargo,
    setType,
    setPackage,
    setFiller,
    submitCargo,
    resetGame,
  } = useGameState();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  function handleSubmit() {
    if (
      !state.selection.type ||
      !state.selection.package ||
      !state.selection.filler
    ) {
      setNotification({
        message: "Заполните все пункты накладной",
        type: "error",
      });
      return;
    }

    const result = submitCargo();

    setNotification({
      message: result.success
        ? "Груз успешно отправлен"
        : "В результате транспортировки груз был поврежден!",
      type: result.success ? "success" : "error",
    });
  }

  return (
    <DndProvider
      backend={TouchBackend}
      options={{
        enableMouseEvents: true,
      }}
    >
      <div className={classes.root}>
        <CustomDragLayer />
        <LeftPanel />
        {currentCargo && <CargoView cargo={currentCargo} />}
        {currentCargo && (
          <Waybill
            cargo={currentCargo}
            typeValue={state.selection.type}
            packageValue={state.selection.package}
            fillerValue={state.selection.filler}
            onTypeDrop={setType}
            onPackageDrop={setPackage}
            onFillerDrop={setFiller}
            onSubmit={handleSubmit}
            successCount={state.successCount}
            total={state.cargos.length}
            wrong={state.wrong}
          />
        )}

        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 10,
          }}
        >
          <Button
            bgColor="pink"
            type="type1v2"
            onClick={() => navigate("/logistics")}
          >
            НАЗАД
          </Button>

          <HelpButton onClick={() => setIsHelpOpen(true)} />
        </div>

        {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        {state.isFinished && (
          <Modal
            successCount={state.successCount}
            total={state.cargos.length}
            onRestart={resetGame}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default CargoPackingGame;
