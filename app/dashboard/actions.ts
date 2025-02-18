'use server';

import {createClient} from '@/utils/supabase/server';
import {decode} from 'base64-arraybuffer';

export async function updateClubLogo({logo}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, club:clubs(*)')
    .eq('id', user.id)
    .single();

  if (logo) {
    // Update club logo
    const base64 = logo.split(',')[1];

    const {data: logoData, error: logoError} = await supabase.storage
      .from('club_logos')
      .upload(`${userData.club.id}`, decode(base64), {
        // cacheControl: '3600',
        upsert: true,
        contentType: 'image/png',
      });

    // Update club logo src
    if (!logoError) {
      const {data: updatedClubData, error: updatedClubError} = await supabase
        .from('clubs')
        .update({logo_src: logoData.path})
        .eq('id', userData.club.id);

      if (!updatedClubError) {
        return {
          success: true,
        };
      }
    }
    return {
      success: false,
    };
  } else {
    // Set club logo to null
    const {data: updatedClubData, error: updatedClubError} = await supabase
      .from('clubs')
      .update({logo_src: null})
      .eq('id', userData.club.id);

    if (!updatedClubError) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}

export async function updateClubCoverPhoto({coverPhoto}) {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, club:clubs(*)')
    .eq('id', user.id)
    .single();

  if (coverPhoto) {
    // Update club logo
    const base64 = coverPhoto.split(',')[1];

    const {data: coverPhotoData, error: coverPhotoError} = await supabase.storage
      .from('club_cover_photos')
      .upload(`${userData.club.id}`, decode(base64), {
        // cacheControl: '3600',
        upsert: true,
        contentType: 'image/png',
      });

    // Update club logo src
    if (!coverPhotoError) {
      const {data: updatedClubData, error: updatedClubError} = await supabase
        .from('clubs')
        .update({cover_photo_src: coverPhotoData.path})
        .eq('id', userData.club.id);

      if (!updatedClubError) {
        return {
          success: true,
        };
      }
    }
    return {
      success: false,
    };
  } else {
    // Set club logo to null
    const {data: updatedClubData, error: updatedClubError} = await supabase
      .from('clubs')
      .update({cover_photo_src: null})
      .eq('id', userData.club.id);

    if (!updatedClubError) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  }
}

export async function fetchClubLogoAndCoverPhoto() {
  const supabase = createClient();

  // Get user data
  const {
    data: {user},
  } = await supabase.auth.getUser();

  // Get user profile data
  const {data: userData, error: userError} = await supabase
    .from('users')
    .select('*, club:clubs(*)')
    .eq('id', user.id)
    .single();

  let logoSrc = null;
  let coverPhotoSrc = null;

  // Get logo signed url
  if (userData.club.logo_src) {
    const {data: logoData, error: logoError} = await supabase.storage
      .from('club_logos')
      .createSignedUrl(`${userData.club.id}`, 60 * 60 * 24 * 30);

    console.log('logoError', logoError);

    if (!logoError) {
      logoSrc = logoData.signedUrl;
    } else {
      return {
        success: false,
      };
    }
  }

  // Get cover photo signed url
  if (userData.club.cover_photo_src) {
    const {data: coverPhotoData, error: coverPhotoError} = await supabase.storage
      .from('club_cover_photos')
      .createSignedUrl(`${userData.club.id}`, 60 * 60 * 24 * 30);

    console.log('coverPhotoError', coverPhotoError);

    if (!coverPhotoError) {
      coverPhotoSrc = coverPhotoData.signedUrl;
    } else {
      return {
        success: false,
      };
    }
  }

  return {
    success: true,
    logoSrc,
    coverPhotoSrc,
  };
}
