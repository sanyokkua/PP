import PropTypes from "prop-types";

const TextPropType = PropTypes.shape({
                                         general: PropTypes.shape({
                                                                      tabUser: PropTypes.string.isRequired,
                                                                      tabUserProfile: PropTypes.string.isRequired,
                                                                      tabProducts: PropTypes.string.isRequired,
                                                                      tabDishes: PropTypes.string.isRequired,
                                                                      tabLogout: PropTypes.string.isRequired,
                                                                      tabEditMode: PropTypes.string.isRequired,
                                                                      tabCalculator: PropTypes.string.isRequired,
                                                                      tabAdmin: PropTypes.string.isRequired
                                                                  }).isRequired,
                                         calculator: PropTypes.shape({
                                                                         age: PropTypes.string.isRequired,
                                                                         height: PropTypes.string.isRequired,
                                                                         weight: PropTypes.string.isRequired,
                                                                         gender: PropTypes.string.isRequired,
                                                                         activity: PropTypes.string.isRequired,
                                                                         formula: PropTypes.string.isRequired,
                                                                         buttonCalculate: PropTypes.string.isRequired,
                                                                         modalHeaderCalculate: PropTypes.string.isRequired,
                                                                         modalResultText: PropTypes.string.isRequired,
                                                                         modalButtonCancel: PropTypes.string.isRequired,
                                                                         HarrisBenedictFormula: PropTypes.string.isRequired,
                                                                         MifflinSanJeoreFormula: PropTypes.string.isRequired,
                                                                         LOW: PropTypes.string.isRequired,
                                                                         MEDIUM: PropTypes.string.isRequired,
                                                                         HIGH: PropTypes.string.isRequired,
                                                                         VERY_HIGH: PropTypes.string.isRequired,
                                                                         MALE: PropTypes.string.isRequired,
                                                                         FEMALE: PropTypes.string.isRequired
                                                                     }).isRequired,
                                         products: PropTypes.shape({
                                                                       buttonCreate: PropTypes.string.isRequired,
                                                                       buttonProductTypes: PropTypes.string.isRequired,
                                                                       buttonLoadCsv: PropTypes.string.isRequired,
                                                                       buttonEdit: PropTypes.string.isRequired,
                                                                       buttonDelete: PropTypes.string.isRequired,
                                                                       inputRecordsNumber: PropTypes.string.isRequired,
                                                                       selectType: PropTypes.string.isRequired,
                                                                       tableHeadName: PropTypes.string.isRequired,
                                                                       tableHeadEnergy: PropTypes.string.isRequired,
                                                                       tableHeadType: PropTypes.string.isRequired,
                                                                       tableHeadActions: PropTypes.string.isRequired,
                                                                       modalEditProductHeadCreate: PropTypes.string.isRequired,
                                                                       modalEditProductHeadEdit: PropTypes.string.isRequired,
                                                                       modalEditProductInputName: PropTypes.string.isRequired,
                                                                       modalEditProductInputEnergy: PropTypes.string.isRequired,
                                                                       modalEditProductSelectType: PropTypes.string.isRequired,
                                                                       modalEditProductButtonCancel: PropTypes.string.isRequired,
                                                                       modalEditTypeHeader: PropTypes.string.isRequired,
                                                                       modalEditTypeButtonCancel: PropTypes.string.isRequired,
                                                                       modalEditTypeInputName: PropTypes.string.isRequired,
                                                                       modalEditTypeButtonCreate: PropTypes.string.isRequired,
                                                                       modalEditTypeButtonSave: PropTypes.string.isRequired,
                                                                       modalEditTypeTableHeadName: PropTypes.string.isRequired,
                                                                       modalEditTypeTableHeadEdit: PropTypes.string.isRequired,
                                                                       modalEditTypeTableHeadDelete: PropTypes.string.isRequired
                                                                   }).isRequired,
                                         dishes: PropTypes.shape({
                                                                     buttonCreate: PropTypes.string.isRequired,
                                                                     tableHeadName: PropTypes.string.isRequired,
                                                                     tableHeadEnergy: PropTypes.string.isRequired,
                                                                     tableHeadAmount: PropTypes.string.isRequired,
                                                                     buttonEdit: PropTypes.string.isRequired,
                                                                     buttonDelete: PropTypes.string.isRequired,
                                                                     modalEditHeader: PropTypes.string.isRequired,
                                                                     modalEditTotalEnergyText: PropTypes.string.isRequired,
                                                                     modalEditInputProductName: PropTypes.string.isRequired,
                                                                     modalEditTableHeaderName: PropTypes.string.isRequired,
                                                                     modalEditTableHeaderEnergy: PropTypes.string.isRequired,
                                                                     modalEditTableHeaderAmount: PropTypes.string.isRequired,
                                                                     modalEditTableHeaderDelete: PropTypes.string.isRequired,
                                                                     modalEditTableInputAmount: PropTypes.string.isRequired,
                                                                     modalEditButtonCancel: PropTypes.string.isRequired,
                                                                     modalEditButtonSave: PropTypes.string.isRequired
                                                                 }).isRequired,
                                         userProfile: PropTypes.shape({
                                                                          inputAge: PropTypes.string.isRequired,
                                                                          inputHeight: PropTypes.string.isRequired,
                                                                          inputWeight: PropTypes.string.isRequired,
                                                                          inputLogin: PropTypes.string.isRequired,
                                                                          inputEmail: PropTypes.string.isRequired,
                                                                          inputPassword: PropTypes.string.isRequired,
                                                                          inputConfirmPassword: PropTypes.string.isRequired,
                                                                          selectGender: PropTypes.string.isRequired,
                                                                          selectGenderMale: PropTypes.string.isRequired,
                                                                          selectGenderFemale: PropTypes.string.isRequired,
                                                                          buttonEdit: PropTypes.string.isRequired,
                                                                          buttonCancel: PropTypes.string.isRequired,
                                                                          buttonEditProfile: PropTypes.string.isRequired,
                                                                          buttonUpdate: PropTypes.string.isRequired,
                                                                          validationSuccessAge: PropTypes.string.isRequired,
                                                                          validationSuccessHeight: PropTypes.string.isRequired,
                                                                          validationSuccessWeight: PropTypes.string.isRequired,
                                                                          validationSuccessLogin: PropTypes.string.isRequired,
                                                                          validationSuccessEmail: PropTypes.string.isRequired,
                                                                          validationSuccessPassword: PropTypes.string.isRequired,
                                                                          validationSuccessPasswordConfirm: PropTypes.string.isRequired,
                                                                          validationErrorAge: PropTypes.string.isRequired,
                                                                          validationErrorHeight: PropTypes.string.isRequired,
                                                                          validationErrorWeight: PropTypes.string.isRequired,
                                                                          validationErrorLogin: PropTypes.string.isRequired,
                                                                          validationErrorEmail: PropTypes.string.isRequired,
                                                                          validationErrorPassword: PropTypes.string.isRequired,
                                                                          validationErrorPasswordConfirm: PropTypes.string.isRequired,
                                                                          validationErrorPasswordAndConfirmDiff: PropTypes.string.isRequired,
                                                                          validationErrorPasswordLength: PropTypes.string.isRequired,
                                                                          userInfoTitle: PropTypes.string.isRequired
                                                                      }),
                                         admin: PropTypes.shape({
                                                                    roleSelect: PropTypes.string.isRequired,
                                                                    numberOfRecords: PropTypes.string.isRequired,
                                                                    tableHeaderEmail: PropTypes.string.isRequired,
                                                                    tableHeaderRole: PropTypes.string.isRequired,
                                                                    tableHeaderActions: PropTypes.string.isRequired,
                                                                    tableActionDelete: PropTypes.string.isRequired
                                                                }).isRequired
                                     });
export default TextPropType;