import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeesComponentsPage, EmployeesDeleteDialog, EmployeesUpdatePage } from './employees.page-object';

const expect = chai.expect;

describe('Employees e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeesComponentsPage: EmployeesComponentsPage;
  let employeesUpdatePage: EmployeesUpdatePage;
  let employeesDeleteDialog: EmployeesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Employees', async () => {
    await navBarPage.goToEntity('employees');
    employeesComponentsPage = new EmployeesComponentsPage();
    await browser.wait(ec.visibilityOf(employeesComponentsPage.title), 5000);
    expect(await employeesComponentsPage.getTitle()).to.eq('sygescamv1App.employees.home.title');
    await browser.wait(ec.or(ec.visibilityOf(employeesComponentsPage.entities), ec.visibilityOf(employeesComponentsPage.noResult)), 1000);
  });

  it('should load create Employees page', async () => {
    await employeesComponentsPage.clickOnCreateButton();
    employeesUpdatePage = new EmployeesUpdatePage();
    expect(await employeesUpdatePage.getPageTitle()).to.eq('sygescamv1App.employees.home.createOrEditLabel');
    await employeesUpdatePage.cancel();
  });

  it('should create and save Employees', async () => {
    const nbButtonsBeforeCreate = await employeesComponentsPage.countDeleteButtons();

    await employeesComponentsPage.clickOnCreateButton();

    await promise.all([
      employeesUpdatePage.setFirstNameInput('firstName'),
      employeesUpdatePage.setLastNameInput('lastName'),
      employeesUpdatePage.setEmailInput('email'),
      employeesUpdatePage.setPhoneNumberInput('phoneNumber')
    ]);

    expect(await employeesUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await employeesUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await employeesUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await employeesUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');

    await employeesUpdatePage.save();
    expect(await employeesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await employeesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Employees', async () => {
    const nbButtonsBeforeDelete = await employeesComponentsPage.countDeleteButtons();
    await employeesComponentsPage.clickOnLastDeleteButton();

    employeesDeleteDialog = new EmployeesDeleteDialog();
    expect(await employeesDeleteDialog.getDialogTitle()).to.eq('sygescamv1App.employees.delete.question');
    await employeesDeleteDialog.clickOnConfirmButton();

    expect(await employeesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
