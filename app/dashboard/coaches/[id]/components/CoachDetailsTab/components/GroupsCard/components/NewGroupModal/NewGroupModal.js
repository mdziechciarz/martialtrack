import {createClient} from '@/utils/supabase/client';
import {PersonAdd20Filled} from '@fluentui/react-icons';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import {useEffect, useState} from 'react';

import {addCoachAsAssistantToGroup} from '@/app/dashboard/coaches/[id]/actions/updateCoach';

export default function NewGroupModal({isOpen, onOpenChange, coachId, refetchCoachData}) {
  const [groups, setGroups] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchGroups = async () => {
      const {data, error} = await supabase.from('groups').select('*, group_assistants(*)');
      if (error) {
        setGroups([]);
        console.error('Error fetching groups:', error);
        return;
      }
      setGroups(
        data.filter(
          group =>
            !group.group_assistants.some(assistant => assistant.coach_id === coachId) &&
            !group.coach_id === coachId
        )
      );
    };
    fetchGroups();
  }, []);

  const handleAddCoachAsAssistantToGroup = async () => {
    try {
      setIsAdding(true);
      const {success} = await addCoachAsAssistantToGroup({
        coachId,
        groupId: selectedGroupId,
      });
      if (success) {
        console.log('Athlete added to group successfully');
        refetchCoachData();
      }
      if (!success) {
        console.error('Failed to add athlete to group');
      }
    } catch (error) {
      console.error('Error adding athlete to group:', error);
    } finally {
      setIsAdding(false);
      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Dodaj jako asystent w nowej grupie
            </ModalHeader>
            <ModalBody>
              <Autocomplete
                defaultItems={groups}
                label="Grupa"
                placeholder="Wybierz grupę"
                onSelectionChange={setSelectedGroupId}
                selectedKey={selectedGroupId}
              >
                {group => (
                  <AutocompleteItem key={group.id} textValue={group.name}>
                    <div className="flex gap-2 items-center">
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          backgroundColor: group.color,
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-small">{group.name}</span>
                      </div>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={handleAddCoachAsAssistantToGroup}
                endContent={<PersonAdd20Filled />}
                isDisabled={!selectedGroupId}
              >
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
