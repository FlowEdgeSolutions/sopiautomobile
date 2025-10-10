import { NextRequest, NextResponse } from 'next/server';
import { getAllLeads, getLeadStats, updateLeadStatus, deleteLead } from '../../../../lib/db-mongodb';
import { validateSession } from '../../../../lib/auth';

// GET - Alle Leads abrufen
export async function GET() {
  try {
    // Auth-Check
    const isAuthenticated = await validateSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }
    
    console.log('📊 Admin: Fetching all leads...');
    
    const leads = await getAllLeads();
    const stats = await getLeadStats();
    
    console.log(`✅ Admin: Fetched ${leads.length} leads`);
    
    return NextResponse.json({
      success: true,
      leads,
      stats,
    });
  } catch (error) {
    console.error('❌ Admin: Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Leads' },
      { status: 500 }
    );
  }
}

// PATCH - Lead-Status aktualisieren
export async function PATCH(request: NextRequest) {
  try {
    // Auth-Check
    const isAuthenticated = await validateSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }
    
    const { id, status, notes } = await request.json();
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID und Status sind erforderlich' },
        { status: 400 }
      );
    }
    
    console.log(`📝 Admin: Updating lead ${id} to status ${status}`);
    
    await updateLeadStatus(id, status, notes);
    
    console.log(`✅ Admin: Lead ${id} updated successfully`);
    
    return NextResponse.json({
      success: true,
      message: 'Lead-Status aktualisiert',
    });
  } catch (error) {
    console.error('❌ Admin: Error updating lead:', error);
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Leads' },
      { status: 500 }
    );
  }
}

// DELETE - Lead löschen
export async function DELETE(request: NextRequest) {
  try {
    // Auth-Check
    const isAuthenticated = await validateSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Nicht authentifiziert' },
        { status: 401 }
      );
    }
    
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Lead-ID ist erforderlich' },
        { status: 400 }
      );
    }
    
    console.log(`🗑️ Admin: Deleting lead ${id}`);
    
    await deleteLead(id);
    
    console.log(`✅ Admin: Lead ${id} deleted successfully`);
    
    return NextResponse.json({
      success: true,
      message: 'Lead gelöscht',
    });
  } catch (error) {
    console.error('❌ Admin: Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Leads' },
      { status: 500 }
    );
  }
}
