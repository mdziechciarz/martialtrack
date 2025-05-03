'use server';

import {createClient} from '@/utils/supabase/server';
import {decode} from 'base64-arraybuffer';

export async function updateAthleteNameAndAvatar({id, fullName, avatarBase64}) {
  try {
    if (!id || !fullName) {
      throw new Error('Missing required parameters');
    }

    const supabase = createClient();
    let avatarUrl = null;

    // Handle avatar upload if provided
    if (avatarBase64) {
      const base64 = avatarBase64.split('base64,')[1];

      // const fileName = `${id}}`;
      const {data: avatarData, error: avatarError} = await supabase.storage
        .from('athlete-avatars')
        .upload(id, decode(base64), {
          contentType: 'image/png',
          upsert: true,
        });

      if (avatarError) {
        console.error('Error uploading avatar:', avatarError);
        throw new Error('Error uploading avatar');
      }

      // Get the public URL for the uploaded avatar
      const {data: publicUrlData} = supabase.storage.from('athlete-avatars').getPublicUrl(id);

      avatarUrl = publicUrlData.publicUrl;
    }

    // Update athlete record with new name and avatar URL (or null if no avatar)
    const {error} = await supabase
      .from('athletes')
      .update({
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) throw new Error('Error updating athlete');

    return {
      success: true,
      message: 'Athlete updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete:', error);
    return {
      success: false,
      message: 'Updating athlete failed.',
    };
  }
}

export async function updateAthletePersonalDetails({id, dateOfBirth, sex, pesel, placeOfBirth}) {
  try {
    if (!id || !dateOfBirth || !sex || !pesel || !placeOfBirth) {
      throw new Error('Missing required parameters');
    }
    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        date_of_birth: dateOfBirth,
        sex,
        pesel,
        place_of_birth: placeOfBirth,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

export async function updateAthleteAddressDetails({
  id,
  streetName,
  houseAndApartmentNumber,
  cityName,
  postalCode,
}) {
  try {
    if (!id || !streetName || !houseAndApartmentNumber || !cityName || !postalCode) {
      throw new Error('Missing required parameters');
    }
    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        street_name: streetName,
        house_and_apartment_number: houseAndApartmentNumber,
        city_name: cityName,
        postal_code: postalCode,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

export async function updateAthleteContactDetails({id, phoneNumber, email}) {
  try {
    if (!id || !phoneNumber || !email) {
      throw new Error('Missing required parameters');
    }
    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        phone_number: phoneNumber,
        email,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

export async function updateAthleteLevels({id, levels}) {
  try {
    if (!id || !levels) {
      throw new Error('Missing required parameters');
    }

    // Validate that levels is an array of objects with the required properties
    if (!Array.isArray(levels) || !levels.every(level => level.key && level.value)) {
      console.error('Invalid levels format:', levels);
      throw new Error('Invalid levels format');
    }

    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        levels,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) console.error('Error updating athlete levels:', error);
    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

export async function updateAthleteMedicalCheckupsAndLicenses({id, licenses}) {
  try {
    if (!id || !licenses) {
      throw new Error('Missing required parameters');
    }

    // Validate that licenses is an array of objects with the required properties -> name (required), number (nullable), expirationDate (nullable), but either number or expirationDate must be present
    if (
      !Array.isArray(licenses) ||
      !licenses.every(
        license =>
          license.name &&
          typeof license.name === 'string' &&
          (license.number === null || typeof license.number === 'string') &&
          (license.expirationDate === null || typeof license.expirationDate === 'string') &&
          (license.number !== null || license.expirationDate !== null) // At least one of number or expirationDate must be present
      )
    ) {
      console.error('Invalid licenses format:', licenses);
      throw new Error('Invalid licenses format');
    }

    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        medical_checkups_and_licenses: licenses,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) console.error('Error updating athlete levels:', error);
    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

export async function updateAthleteOtherDetails({id, other}) {
  try {
    if (!id || !other) {
      throw new Error('Missing required parameters');
    }

    // Validate that levels is an array of objects with the required properties
    if (!Array.isArray(other) || !other.every(entry => entry.key && entry.value)) {
      console.error('Invalid levels format:', other);
      throw new Error('Invalid levels format');
    }

    const supabase = createClient();

    const {error} = await supabase
      .from('athletes')
      .update({
        other,
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) console.error('Error updating athlete levels:', error);
    if (error) throw new Error('Error updating athlete personal details');

    return {
      success: true,
      message: 'Athlete data updated successfully',
    };
  } catch (error) {
    console.error('Error updating athlete data:', error);
    return {
      success: false,
      message: 'Updating athlete data failed.',
    };
  }
}

// groups

export async function addAthleteToGroup({athleteId, groupId}) {
  try {
    if (!athleteId || !groupId) {
      throw new Error('Missing required parameters');
    }
    const supabase = createClient();

    const {error} = await supabase.from('group_members').insert({
      athlete_id: athleteId,
      group_id: groupId,
    });

    if (error) console.error('Error adding athlete to group:', error);
    if (error) throw new Error('Error adding athlete to group');

    return {
      success: true,
      message: 'Athlete added to group successfully',
    };
  } catch (error) {
    console.error('Error adding athlete to group:', error);
    return {
      success: false,
      message: 'Adding athlete to group failed.',
    };
  }
}

export async function removeAthleteFromGroup({athleteId, groupId}) {
  try {
    if (!athleteId || !groupId) {
      throw new Error('Missing required parameters');
    }
    const supabase = createClient();

    const {error} = await supabase
      .from('group_members')
      .delete()
      .eq('athlete_id', athleteId)
      .eq('group_id', groupId);

    if (error) console.error('Error removing athlete from group:', error);
    if (error) throw new Error('Error removing athlete from group');

    return {
      success: true,
      message: 'Athlete removed from group successfully',
    };
  } catch (error) {
    console.error('Error removing athlete from group:', error);
    return {
      success: false,
      message: 'Removing athlete from group failed.',
    };
  }
}
