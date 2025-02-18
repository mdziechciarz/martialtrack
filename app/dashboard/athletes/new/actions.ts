'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function createNewAthlete({
  fullName,
  sex,
  pesel,
  dateOfBirth,
  placeOfBirth,
  streetName,
  cityName,
  postalCode,
  houseAndAppartmentNumber,
  phoneNumber,
  email,
  other = null,
  medicalCheckupsAndLicenses = null,
  levels = null
}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select()
    .eq('id', user.id)
    .single();

  // Create athlete profile
  const {data: athleteData, error: athleteError} = await supabase
    .from('athletes')
    .insert([
      {
        club_id: userData.club_id,
        full_name: fullName,
        sex,
        pesel,
        date_of_birth: dateOfBirth,
        place_of_birth: placeOfBirth,
        street_name: streetName,
        city_name: cityName,
        postal_code: postalCode,
        house_and_appartment_number: houseAndAppartmentNumber,
        phone_number: phoneNumber,
        email,
        other,
        medical_checkups_and_licenses: medicalCheckupsAndLicenses,
        levels,
      }
    ])
    .select()

    console.log('athleteData', athleteData);
    console.log('athleteError', athleteError);


  redirect(`/dashboard/athletes/${athleteData[0].id}`);
}