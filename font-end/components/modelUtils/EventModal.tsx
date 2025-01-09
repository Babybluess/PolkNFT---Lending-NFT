import React, { useState } from "react";
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";

function EventModal() {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const [action, setAction] = useState<string>("");
   return (
      <div className="mt-5">
         <Button onPress={onOpen} className="bg-orange-400 text-white rounded-xl">
            Create Event
         </Button>
         <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={true}
            onOpenChange={onOpenChange}
            className="flex z-50"
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">
                        New Station
                     </ModalHeader>
                     <ModalBody>
                        <Form
                           className="w-full max-w-xs flex flex-col gap-4"
                           validationBehavior="native"
                           onReset={() => setAction("reset")}
                           onSubmit={(e) => {
                              e.preventDefault();
                              let data = Object.fromEntries(
                                 new FormData(e.currentTarget),
                              );

                              setAction(`submit ${JSON.stringify(data)}`);
                           }}
                        >
                           <span>Address</span>
                           <Input
                              isRequired
                              className="max-w-xs"
                              defaultValue="0xcdc54fBF11F9c28E55410af0227298098719D176"
                              type="text"
                           />
                        </Form>
                     </ModalBody>
                     <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                           Close
                        </Button>
                        <Button className="bg-green-300" variant="light">
                           Add
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </div>
   );
}

export default EventModal;
