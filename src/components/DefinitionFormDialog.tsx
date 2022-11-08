import { Form, Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createDefinitionSchema } from "../utils/schema-validations/create-definition.schema";
import { trpc } from "../utils/trpc";
import { Dialog, DialogContent, DialogTitle } from "./Dialog";
import { FormikSelect } from "./formik/FormikSelect";
import { FormikTextArea } from "./formik/FormikTextArea";
import { FormikTextField } from "./formik/FormikTextField";

interface DefinitionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues = {
  value: "",
  knownFrom: "",
  languageId: "",
  description: "",
};

export const DefinitionFormDialog: React.FC<DefinitionFormDialogProps> = ({ isOpen, onClose }) => {
  const { data } = trpc.useQuery(["languages.getAllLanguages"]);
  const trpcContext = trpc.useContext();
  const mutation = trpc.useMutation("definitions.createDefinition");

  const handleSubmit = async (formData: typeof initialValues) => {
    try {
      const response = await mutation.mutateAsync(formData);
      console.log(response);
      await trpcContext.invalidateQueries("definitions.getAllDefinitions");
      onClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Definition form</DialogTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(createDefinitionSchema)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormikTextField name="value" label="Sentence" required />

                <FormikTextField name="knownFrom" label="Known from" />
              </div>

              <FormikSelect
                label="Language"
                name="languageId"
                options={[{ label: "Select language", value: "" }].concat(
                  data?.languages.map((language) => ({
                    label: language.name,
                    value: language.id,
                  })) ?? []
                )}
                required
              />

              <FormikTextArea name="description" label="Description" required />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-contrast-primary p-2 text-sm text-primary-default"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
