


'''from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2016'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_20112.csv', index=False)

print("Data has been successfully written to josaa_2016.csv")'''


'''from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2017'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_2017.csv', index=False)

print("Data has been successfully written to josaa_2017.csv")'''

'''from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2018'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_2018.csv', index=False)

print("Data has been successfully written to josaa_2018.csv")'''


'''from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2019'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_2019.csv', index=False)

print("Data has been successfully written to josaa_2019.csv")'''


'''from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2021'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_2021.csv', index=False)

print("Data has been successfully written to josaa_2021.csv")'''

from bs4 import BeautifulSoup
import mechanize
import pandas as pd

def get_jitems(browser, element):
    browser.select_form(nr=0)
    ctl = browser.form.find_control(element)
    state_items = ctl.get_items()
    return state_items[1:]

# Initialize the browser
brwsr = mechanize.Browser()
brwsr.set_handle_robots(False)
brwsr.set_handle_refresh(False)

# Define the header for the DataFrame
header = ['Institute', 'Academic Program Name', 'Quota', 'Seat Type', 'Gender', 'Opening Rank', 'Closing Rank', 'Year', 'Round']
df = pd.DataFrame(columns=header)

# Open the JOSAA website
brwsr.open('https://josaa.admissions.nic.in/applicant/seatmatrix/openingclosingrankarchieve.aspx')

# Manually set the year to 2016
year = '2022'
brwsr.select_form(nr=0)
brwsr['ctl00$ContentPlaceHolder1$ddlYear'] = [year]
response = brwsr.submit()

for round in get_jitems(brwsr, 'ctl00$ContentPlaceHolder1$ddlroundno'):
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlroundno'] = [str(round)]
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstype'] = ['IIT']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlInstitute'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlBranch'] = ['ALL']
    response = brwsr.submit()
    brwsr.select_form(nr=0)
    brwsr['ctl00$ContentPlaceHolder1$ddlSeatType'] = ['ALL']
    response = brwsr.submit()
    soup = BeautifulSoup(response.read(), 'lxml')
    table = soup.find('table')

    for row in table.find_all('tr')[1:]:
        cols = row.find_all('td')
        if len(cols) >= 7:
            data = [
                cols[0].text.strip(),  # Institute
                cols[1].text.strip(),  # Academic Program Name
                cols[2].text.strip(),  # Quota
                cols[3].text.strip(),  # Seat Type
                cols[4].text.strip(),  # Gender
                cols[5].text.strip(),  # Opening Rank
                cols[6].text.strip(),  # Closing Rank
                year,
                str(round)
            ]
            df = df._append(pd.Series(data, index=df.columns[:len(data)]), ignore_index=True)

# Save the DataFrame to a CSV file
df.to_csv('josaa_2022.csv', index=False)

print("Data has been successfully written to josaa_2022.csv")





















