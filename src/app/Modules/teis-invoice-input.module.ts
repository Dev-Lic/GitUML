export class TeisInvoiceInputModule {
  constructor(
    public Billing_Org: string,
    public Billing_Dept: string,
    public Charged_Org: string,
    public Charged_Org_Name: string,
    public Charged_Dep: string,
    public Fiscal_Month: string,
    public Charge_Type: string,
    public Charge_Type_Description: string,
    public Charge_Unit: string,
    public Charge_Description: string,
    public Charge_Amount: number,
    public Billable_Amount: string,
    public Hyperion_Profit_Center: string,
    public SAP_Profit_Center: string,
    public Charge_Category: string,
    public Revenue_Type: string,
    public Charged_entity: string,
    public Year: number,
    public Month: string
  ) {}
  
}
